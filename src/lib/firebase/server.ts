import type { LinkDoc, ProfileDoc } from '@/types/mylink';
import { firebaseConfig } from './client';

/**
 * 서버(공개 페이지·OG 이미지·sitemap) 전용 Firestore 읽기.
 * Vercel 서버리스에서는 Firebase 웹 SDK 의 실시간 연결이 멈출 수 있어
 * 공개 읽기 규칙(allow read: if true)을 이용해 REST API 로 직접 조회한다.
 */
const PROJECT_ID = firebaseConfig.projectId;
const API_KEY = firebaseConfig.apiKey;
const DOCS_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  timestampValue?: string;
};
type FirestoreDoc = { name: string; fields?: Record<string, FirestoreValue> };

const str = (v?: FirestoreValue) => v?.stringValue ?? '';
const num = (v?: FirestoreValue) => Number(v?.integerValue ?? v?.doubleValue ?? 0);
const docId = (doc: FirestoreDoc) => doc.name.split('/').pop() ?? '';

async function getDocument(path: string): Promise<FirestoreDoc | null> {
  const res = await fetch(`${DOCS_URL}/${path}?key=${API_KEY}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore REST ${res.status}: ${path}`);
  return res.json();
}

/** /[username] → userId. 없으면 null */
export async function findUserIdByUsernameServer(username: string): Promise<string | null> {
  const doc = await getDocument(`usernames/${encodeURIComponent(username.toLowerCase())}`);
  return doc ? str(doc.fields?.uid) || null : null;
}

export async function fetchProfileServer(userId: string): Promise<ProfileDoc | null> {
  const doc = await getDocument(`users/${userId}/profile/info`);
  if (!doc?.fields) return null;
  const f = doc.fields;
  return {
    username: str(f.username),
    displayName: str(f.displayName),
    bio: str(f.bio),
    avatarUrl: str(f.avatarUrl),
  };
}

/** users/{userId}/links 를 createdAt 오름차순으로 조회 */
export async function fetchLinksServer(userId: string): Promise<LinkDoc[]> {
  const res = await fetch(`${DOCS_URL}/users/${userId}:runQuery?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'links' }],
        orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'ASCENDING' }],
      },
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Firestore REST ${res.status}: links`);
  const rows: { document?: FirestoreDoc }[] = await res.json();
  return rows
    .filter((r): r is { document: FirestoreDoc } => Boolean(r.document))
    .map(({ document: d }) => ({
      id: docId(d),
      title: str(d.fields?.title),
      url: str(d.fields?.url),
      description: str(d.fields?.description),
      clickCount: num(d.fields?.clickCount),
      createdAt: Date.parse(d.fields?.createdAt?.timestampValue ?? '') || 0,
    }));
}

/** sitemap 용: 등록된 모든 username (1시간 캐시) */
export async function listUsernamesServer(): Promise<string[]> {
  const names: string[] = [];
  let pageToken = '';
  do {
    const res = await fetch(
      `${DOCS_URL}/usernames?key=${API_KEY}&pageSize=300${pageToken ? `&pageToken=${pageToken}` : ''}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Firestore REST ${res.status}: usernames`);
    const body: { documents?: FirestoreDoc[]; nextPageToken?: string } = await res.json();
    body.documents?.forEach((d) => names.push(docId(d)));
    pageToken = body.nextPageToken ?? '';
  } while (pageToken);
  return names;
}

/** /[username] 페이지·OG 이미지 공통: username → { userId, profile, links } */
export async function loadPublicPage(rawUsername: string) {
  const username = decodeURIComponent(rawUsername).toLowerCase();
  const userId = await findUserIdByUsernameServer(username);
  if (!userId) return null;
  const [profile, links] = await Promise.all([fetchProfileServer(userId), fetchLinksServer(userId)]);
  return profile ? { userId, profile, links } : null;
}
