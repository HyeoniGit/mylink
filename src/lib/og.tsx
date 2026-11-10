import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
const BG = '#5B5FC7';

/**
 * Google Fonts 에서 화면에 쓰일 글자만 담은 Noto Sans KR(Bold) 을 받아온다.
 * User-Agent 를 지정하지 않으면 OG 렌더러가 읽을 수 있는 TTF 로 내려준다.
 */
async function loadKoreanFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

interface OgCardOptions {
  title: string;
  subtitle: string;
  avatarUrl?: string;
  badge?: string;
  footer: string;
}

/** 보라색 배경 + "마이링크" 로고 + 사용자 정보 OG 이미지 */
export async function renderOgCard({ title, subtitle, avatarUrl, badge, footer }: OgCardOptions) {
  const initial = title.trim().charAt(0) || 'M';
  const font = await loadKoreanFont(`마이링크${title}${subtitle}${badge ?? ''}${footer}${initial}`);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: BG,
          color: 'white',
          fontFamily: 'Noto Sans KR',
        }}
      >
        {/* 로고 */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              background: 'white',
              color: '#e60012',
              border: '6px solid #e60012',
              borderRadius: 999,
              padding: '6px 28px',
              fontSize: 36,
            }}
          >
            마이링크
          </div>
        </div>

        {/* 프로필 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              width={200}
              height={200}
              alt=""
              style={{ borderRadius: 999, border: '8px solid white', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 999,
                border: '8px solid white',
                background: '#21242e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 96,
              }}
            >
              {initial}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
            <div style={{ fontSize: 72, lineHeight: 1.1 }}>{title}</div>
            <div style={{ fontSize: 32, opacity: 0.9, lineHeight: 1.4 }}>{subtitle}</div>
            {badge && (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    background: '#ecab37',
                    color: '#21242e',
                    borderRadius: 8,
                    padding: '6px 18px',
                    fontSize: 28,
                  }}
                >
                  {badge}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* URL */}
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.85 }}>{footer}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: 'Noto Sans KR', data: font, weight: 700, style: 'normal' }] : undefined,
    }
  );
}
