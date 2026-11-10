/** users/{userId}/links/{linkId} */
export interface LinkDoc {
  id: string;
  title: string;
  url: string;
  description?: string;
  /** 누적 클릭 수 (13주차) */
  clickCount: number;
  /** epoch ms (Firestore Timestamp 를 변환) */
  createdAt: number;
}

export type LinkInput = Pick<LinkDoc, 'title' | 'url' | 'description'>;

/** users/{userId}/profile/info */
export interface ProfileDoc {
  /** 공유 URL 용: mylink.kr/{username} */
  username: string;
  /** 화면에 표시될 이름 */
  displayName: string;
  /** 자기소개 */
  bio: string;
  /** 프로필 사진 URL (구글 프로필 사진 기본값) */
  avatarUrl: string;
}
