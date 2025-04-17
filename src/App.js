import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// High CTR color palette
const CTR_COLORS = [
  { bg: '#2563eb', label: '블루+옐로우' }, // Blue
  { bg: '#ef4444', label: '레드+화이트' }, // Red
  { bg: '#22c55e', label: '그린+화이트' }, // Green
  { bg: '#a21caf', label: '퍼플+옐로우' }, // Purple
  { bg: '#0f172a', label: '네이비+오렌지' }, // Navy
  { bg: '#000', label: '블랙+라임' }, // Black
  { bg: '#fde047', label: '옐로우+퍼플' }, // Yellow
  { bg: '#f97316', label: '오렌지+블루' }, // Orange
  // 추가 색상 5가지
  { bg: '#14b8a6', label: '민트+핑크' },      // Mint
  { bg: '#f43f5e', label: '핑크+블랙' },      // Pink
  { bg: '#eab308', label: '골드+블루' },      // Gold
  { bg: '#6366f1', label: '인디고+화이트' },  // Indigo
  { bg: '#fb7185', label: '로즈+화이트' },    // Rose
];

function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substr(0,2),16);
  const g = parseInt(hexcolor.substr(2,2),16);
  const b = parseInt(hexcolor.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 128) ? '#222' : '#fff';
}

function pickRandomIdx(currentIdx) {
  let idx;
  do {
    idx = Math.floor(Math.random() * CTR_COLORS.length);
  } while (idx === currentIdx);
  return idx;
}

// 색상명 매핑 추가
const COLOR_CLASSNAMES = {
  '#2563eb': 'blue-btn',
  '#ef4444': 'red-btn',
  '#22c55e': 'green-btn',
  '#a21caf': 'purple-btn',
  '#0f172a': 'navy-btn',
  '#000': 'black-btn',
  '#fde047': 'yellow-btn',
  '#f97316': 'orange-btn',
  '#14b8a6': 'mint-btn',
  '#f43f5e': 'pink-btn',
  '#eab308': 'gold-btn',
  '#6366f1': 'indigo-btn',
  '#fb7185': 'rose-btn',
};

function App() {
  // 각 버튼의 색상 인덱스와 마지막 클릭된 버튼 타입
  const [rectIdx, setRectIdx] = useState(0);
  const [pillIdx, setPillIdx] = useState(1);
  const [lastClicked, setLastClicked] = useState('rect'); // 'rect' or 'pill'

  const rectColor = CTR_COLORS[rectIdx];
  const pillColor = CTR_COLORS[pillIdx];

  // 현재 색상에 맞는 클래스명
  const rectClass = COLOR_CLASSNAMES[rectColor.bg] || 'custom-btn';
  const pillClass = COLOR_CLASSNAMES[pillColor.bg] || 'custom-btn';

  const rectCSS = `.${rectClass} {
  background: ${rectColor.bg};
  color: ${getContrastYIQ(rectColor.bg)};
  border: none;
  border-radius: 16px;
  font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
  font-size: 1.1rem;
  padding: 0.85em 2.2em;
  font-weight: 700;
  box-shadow: 0 2px 12px #0002;
  transition: all 0.18s cubic-bezier(.4,2,.6,1);
  cursor: pointer;
}
.${rectClass}:hover, .${rectClass}:focus {
  filter: brightness(1.08);
  transform: translateY(-2px) scale(1.04);
  outline: none;
}`;
  const pillCSS = `.${pillClass} {
  background: ${pillColor.bg};
  color: ${getContrastYIQ(pillColor.bg)};
  border: none;
  border-radius: 999px;
  font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
  font-size: 1.1rem;
  padding: 0.85em 2.5em;
  font-weight: 800;
  box-shadow: 0 2px 12px #0002;
  transition: all 0.18s cubic-bezier(.4,2,.6,1);
  cursor: pointer;
}
.${pillClass}:hover, .${pillClass}:focus {
  filter: brightness(1.08);
  transform: translateY(-2px) scale(1.04);
  outline: none;
}`;

  // HTML 코드도 새로운 클래스명 사용
  const rectHTML = `<button class="${rectClass}">트렌디 버튼</button>`;
  const pillHTML = `<button class="${pillClass}">트렌디 버튼</button>`;

  const codeCSS = lastClicked === 'rect' ? rectCSS : pillCSS;
  const codeHTML = lastClicked === 'rect' ? rectHTML : pillHTML;

  return (
    <>
      <GlobalStyle />
      <AwardCard>
        <Header>
          <TrophyIcon />
          <Logo>트렌디 버튼 랜덤생성기</Logo>
          <SubTitle>디자인 감각을 깨우는 랜덤 버튼 스타일,<br></br>지금 바로 웹 디자이너의 감성을 체험해보세요.</SubTitle>
        
        </Header>
        <ButtonRow>
          <StyledRectBtn
            className={rectClass}
            style={{
              background: rectColor.bg,
              color: getContrastYIQ(rectColor.bg)
            }}
            onClick={() => {
              setRectIdx(pickRandomIdx(rectIdx));
              setLastClicked('rect');
            }}
            aria-label="약간 둥근 트렌디 버튼"
          >
            <StarIcon /> 트렌디 버튼
          </StyledRectBtn>
          <StyledPillBtn
            className={pillClass}
            style={{
              background: pillColor.bg,
              color: getContrastYIQ(pillColor.bg)
            }}
            onClick={() => {
              setPillIdx(pickRandomIdx(pillIdx));
              setLastClicked('pill');
            }}
            aria-label="많이 둥근 트렌디 버튼"
          >
            <StarIcon /> 트렌디 버튼
          </StyledPillBtn>
        </ButtonRow>
        <CodePanel>
          <CodeTitle>CSS</CodeTitle>
          <CodeBlock>{codeCSS}</CodeBlock>
          <CopyBtnWrap>
            <CopyBtn onClick={() => navigator.clipboard.writeText(codeCSS)}>CSS 복사</CopyBtn>
          </CopyBtnWrap>
          <CodeTitle>HTML</CodeTitle>
          <CodeBlock>{codeHTML}</CodeBlock>
          <CopyBtnWrap>
            <CopyBtn onClick={() => navigator.clipboard.writeText(codeHTML)}>HTML 복사</CopyBtn>
          </CopyBtnWrap>
        </CodePanel>
        <Footer>
          <FooterLink
            href="https://www.threads.net/@ilovemom_2026?invite=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            문의: 스레드 @ilovemom_2026
          </FooterLink>
        </Footer>
      </AwardCard>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/npm/pretendard@1.3.8/dist/web/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
  html { font-size: 16px; }
  body {
    background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
    font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
    color: #222;
    margin: 0;
    min-height: 100vh;
  }
`;

const AwardCard = styled.div`
  max-width: 520px;
  margin: 24px auto;
  background: #fff;
  border-radius: 2.2rem;
  box-shadow: 0 8px 32px #2563eb22, 0 1.5px 8px #0001;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.1rem 1.1rem 1.1rem;
  gap: 1.5rem;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1.1rem 0.3rem;
    gap: 1.1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 0.2em;
`;

const Logo = styled.h1`
  font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', Arial, sans-serif;
  font-size: 1.45rem;
  font-weight: 900;
  color: #2563eb;
  letter-spacing: 0.08em;
  margin: 0.2em 0 0.1em 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;

const SubTitle = styled.div`
  font-size: 1.02rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 0.2em;
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    gap: 0.7rem;
  }
`;

const StyledRectBtn = styled.button`
  border: none;
  border-radius: 16px;
  font-size: 1.13rem;
  font-family: inherit;
  padding: 0.85em 2.2em;
  font-weight: 700;
  box-shadow: 0 2px 12px #0002;
  cursor: pointer;
  transition: filter 0.18s, transform 0.18s;
  letter-spacing: 0.05em;
  margin-bottom: 0.2em;
  &:hover, &:focus {
    filter: brightness(1.08);
    transform: translateY(-2px) scale(1.04);
    outline: none;
  }
`;

const StyledPillBtn = styled.button`
  border: none;
  border-radius: 999px;
  font-size: 1.13rem;
  font-family: inherit;
  padding: 0.85em 2.5em;
  font-weight: 800;
  box-shadow: 0 2px 12px #0002;
  cursor: pointer;
  transition: filter 0.18s, transform 0.18s;
  letter-spacing: 0.05em;
  margin-bottom: 0.2em;
  &:hover, &:focus {
    filter: brightness(1.08);
    transform: translateY(-2px) scale(1.04);
    outline: none;
  }
`;

const CodePanel = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 0.9rem;
  box-shadow: 0 1px 6px #2563eb11;
  padding: 0.7rem 0.7rem 0.5rem 0.7rem;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CodeBlock = styled.pre`
  background: #f8fafc;
  border-radius: 0.6rem;
  padding: 0.7em;
  font-size: 0.97rem;
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', 'Consolas', monospace;
  color: #232526;
  margin-bottom: 0.2em;
  overflow-x: auto;
`;

const CodeTitle = styled.div`
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 0.1em;
  font-size: 0.98rem;
`;

const CopyBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.2em;
`;

const CopyBtn = styled.button`
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.3em 2.5em;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  align-self: center;
  transition: filter 0.18s;
  &:hover, &:focus {
    filter: brightness(1.07);
    outline: none;
  }
  &:active {
    filter: brightness(0.95);
  }
`;

// SampleLink 컴포넌트 삭제 (더 이상 사용하지 않음)

const Footer = styled.footer`
  text-align: center;
  color: #aaa;
  font-size: 0.97rem;
  margin-top: 0.5em;
  padding-top: 0.5em;
`;

// FooterLink 추가
const FooterLink = styled.a`
  color: #2563eb;
  text-decoration: none;
  cursor: pointer;
  &:hover, &:focus {
    color: #1e40af;
  }
`;

// Award trophy icon
function TrophyIcon() {
  return (
    <svg width="1.6em" height="1.6em" viewBox="0 0 32 32" fill="none" style={{verticalAlign:'-0.3em'}}>
      <ellipse cx="16" cy="28" rx="10" ry="2.5" fill="#e0e7ff"/>
      <rect x="10" y="24" width="12" height="4" rx="2" fill="#facc15"/>
      <rect x="12" y="20" width="8" height="6" rx="2" fill="#fde047"/>
      <path d="M8 6a8 8 0 0 0 16 0" stroke="#facc15" strokeWidth="2" fill="#fde047"/>
      <ellipse cx="16" cy="6" rx="8" ry="8" fill="#fde047" stroke="#facc15" strokeWidth="2"/>
      <ellipse cx="16" cy="6" rx="5" ry="5" fill="#fffde7"/>
      <ellipse cx="16" cy="6" rx="2" ry="2" fill="#facc15"/>
    </svg>
  );
}

// Star icon
function StarIcon() {
  return (
    <svg width="1.1em" height="1.1em" viewBox="0 0 20 20" fill="#facc15" style={{verticalAlign:'-0.15em'}}>
      <polygon points="10,2 12.4,7.5 18,8 13.5,12 15,18 10,14.5 5,18 6.5,12 2,8 7.6,7.5" />
    </svg>
  );
}

export default App;