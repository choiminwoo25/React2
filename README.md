# 202130436 최민우

7주차

### SERVER 및 client component 작동방식 및 사용시기

- client component 사용 시기
- state 및 event handler ex: onClick,onChange
- Lifecyycle logic ex: useEffect
- 브라우저 전용 API ex: localStorage , window, Navigator.geolocation 등
- 사용자 정의 Hook

- server component 사용시기
- 서버의 데이터베이스 혹은 API data 가져오는 경우
- API key , token, 및 기타 보안 데이터를 client에 노출하지 않고 사용하는 경우
- 브라우저로 전송되는 javascript의 양을 줄이고 싶은 경우
- 콘텐츠가 포함된 첫번째 페인트(First Comtentful Paint-FCP)를 개선하고 콘텐츠를 Client에 점직적으로 스트리밍

### 낙관적 업데이트(Optimistic Update)

- 사용자에 의해서 이벤트가 발생하면 서버 응답을 기다리지 않고 클라이언트의 UI를 즉시 변경한다.
- 서버에 보낸 요청의 성공을 낙관(optimistic)한다고 가정해서 먼저 화면에 변화를 보여준다
- 서버에 응답이 없으면 ui를 원래 상태로 되돌립니다.(rollback)
- 네트워크 지연 동안에도 앱이 빠르게 반응하도록 느끼게 하는것이 목적입니다.

- 장점
 - 서버 응답 속도와 관계없이 즉각적인 피드백을 제공하여 사용자 경헙을 향상시킵니다.
 - 네트워크 상태가 나쁘거나 응답 시간이 길어도 사용자에게 체감되는 속도가 빠릅니다,

- 단점
 - 서버에서 오류가 발생하면, 사용자에게는 잠시동안 잘못된 정보가 표시될 수 있습니다.
 - 오류 발생시 복구 로직이 필요합니다.

### 비관적 업데이트(Pessimistic Update)

- 이벤트가 발생하면 먼저 서버에 요청을 보내고, 서버에서 성공 응답을 받은 후에 클라이언트의 Ui를 업데이트합니다.

- 장점
 - 서버의 응답을 기반으로 하기 때문에 데이터의 일관성이 보장됩니다.
 - 오류가 발생할 가능성이 낮고, 잘못된 정보가 표시될 염려가 없습니다.

- 단점
 - 사용자는 서버의 응답을 기다려야 하므로, 응답이 늦어지면 사용자 경험이 저하 될 수 있습니다.
 - 특히 네트워크 지연이 발생할 경우 체감 속도가 느려집니다.


### Server component 의 작동
- Nextjs는 server에서 React의 API를 사용하여 렌더링을 조정한다.
- 렌더링 작업은 개별 라우팅 세금먼트 별 묶음(Chunk)로 나뉜다.

server component는 RSC Payload(React Server Componenet Payload)라는 특수한 데이터 형식으로 렌더링 됩니다.

client componenet 와 RSC Payload는 HTML을 미리 렌더링(prereder)하는데 사용됩니다.

### React Server Component Payload(RSC)란?
- RSC 페이로드는 렌더링된 React server Components 트리를 직렬화하여 표현한 컴팩트한 형태이다
- client에서 React가 브라우저의 DOM을 업데이트하는데 사용된다.
- RSC페이로드에 포함되는 내용
 - server component의 렌더링 결과
 - client component가 렌더링 될 위치 및 해당 javascript 파일 참조를 위한 자리 표시자(placeholder)
 - 

- RSC는 JSON인가 바이너리인가?
  - 과거 : JSON 기반
  - RSC 초기에는 JSON 형식의 문자열로 전달 
  - 예 : {type : "component", props: {title:"hello"}}

  - 현재: 바이너리 형식으로 취적화
  - 최신 React 특히 Nextjs APP Router 는 RSC payload 를 compact binary format 으로전송한다
  - JSON이 아니라 React 전용 이진 포맷으로 스트림을 통해 전달된다.
  - 이 방식은 JSON보다 용량이 작고, 빠르게 파싱할 수 있다.

### Client component 의 작동
1. HTML은 사용자에게 경로(라우팅 페이지)의 비대화형(정적) 미리보기를 즉시 보여주는데 사용 
2. RSC 페이로드는 client와 server component 트리를 조정하는데 사용된다.
3. javascript는 client component를 hydration하고 애플리케이션을 대화형으로 만드는데 사용

### Hydration이란?
- Hydration은 이벤트 핸들러를 DOM에 연결하여 정적 HTML을 인터랙티브하게 만드는 React의 프로세스이다.









---

6주차

#### 동적 세그먼트 없는 generateStaticParams

- generateStaticparam() 자체는 slug 배열만 반환한다.
- Next.js 빌드 프로세스가 이 배열을 순회하며 => 각 slug에 대해 page.tsx 실행 -> 정적 HTML 생성
- map함수는 HTML을 작성해야 할 리스트를 next.js에게 전달하는 역할을 한다.

#### await이 없어도 async를 붙여 두는 이유

- Nextjs13+dml APP Router에서 Page.tsx 같은 Server Componenet는 비동기 렌더링을 전제로 하고 있다.
- 즉 page.tsx 안에서 데이터를 fetch하는 경우가 많기 때문에 async를 기본으로 붙여도 문제가 없다.

1. 일관성 유지 : 같은 프로젝트 안에서 어떤 페이지는 async , 어떤 페이지는 일반 function이면 혼란스러울수 있다
2. 확장성 : 지금은 더미 데이터(postsfind(...))를 쓰지만, 나중에 DB나 API에서 데이터를 가져올 때 awaitfetch(...) 같은 코드가
   들어갈 수 있기 때문에 미리 async를 붙여 두면 수정할 필요가 없다
3. React Server Component 호환성 : Server Component는 Promise를 반환할 수 있어야 하고, Next.js는 내부적으로
   async 함수 패턴에 맞춰 최적화된 렌더링 파이브라인을 갖고 있어서 async가 붙어 있어도 불필요한 오버헤드가 거의 없다.

#### generatestaticParams 가 없는 경우와 있는 경우 비교

- generateStaticParams가 없는 경우 Next.js는 slug값을 빌드 타임에는 모르는 상태이다
  - 따라서 slug 페이지에 접속하면 nextjs가 서버에서 요청할 때마다 해당 페이지를 동적으로 렌더링하며ㅡ
    빌드의 결과물로 HTML 파일은 생성되지 않는다

- generateStaticParams가 있는 경우 Next.js에 빌드 타임에 생성할 slug목록을 알려줄수 있다
  - 이 경우에는 지정한 slug에 대해서는 정적HTML +JSON이 빌드 타임에 생성되어,
    최조 접근시 SSR이 필요 없이 미리 만들어진 페이지 제공한다.

#### 느린 네트워크

- 네트워크가 느리거나 불안정한 경우, 사용자가 링크를 클릭하기 전에 프리페칭이 완료되지 않을 수 있다.
- 이것은 정적 경로와 동적 경로 모두에 영향을 미칠 수 있다.
- 이 경우 loading.tsx 파일이 아직 프리페칭되지 않았기 때문에 즉시 표시되지 않을 수 있다,.
- 체감 성능을 개선하기 위해 useLinkStatus Hook을 사용하여 전환이 진행되는 동안 사용자에게
  인라인 시각적 피드백을 표시할 수 있따.

#### Hydration이란 무엇인가

- Hydration이란 서버에서 생성된 HTML에 javascript 로직을 추가하여 동적으로 상호작용이 가능하도록 만드는 과정을 의미
- SSR

#### SERVER 및 COMPONENT 사용

---

5주차

- App Router 기능 - 중첩 레이아웃 : 여러 레벨의 layout.js 파일을 통해 레이아웃을 계층적으로 구성 가능 - 서버 컴포넌트() : 서버에서만 렌더링되는 컴포넌트로 성능 최적화 가능 - 로딩UI : 페이지 전환중 보여줄 loading.js 파일 제공 - 에러UI : 특정 경로에서만 발생하는 에러를 처리할 error.js 제공
  병령 라우팅: 하나의 경로 안에서 탭 같은 독립적인 뷰를 병렬로 렌더링 가능

- 프로젝트 별 추천 방식
  -- 새 프로젝트 시작 : App Router (app디렉토리 기반)
  -- 기존 프로젝트 유지보수 : page1/ 계속 사용 가능하지만, 점차 마이그레이션 필요
  -- React처럼 수동 라우팅이 필요한 경우 React + react-router-dom 사용 가능(next.js는 자동 라우팅 기본)

#### 연결 및 탐색

1. Server rendering
2. Prefetching
3. Streaming
4. Client-side transitons

#### 서버 렌더링

서버렌더링은 정적렌더링, 동적 렌더링 2가지

- 정적 렌더링 : 빌드 시점이나 재검증 중에 발생, 결과는 캐시된다.
- 동적 렌더링 : 클라이언트 요청에 대한 응답으로 요청 시점에 발생

서버렌더링의 단점 : 클라이언트가 새 경로를 표시하기 전에 서버의 응답을 기다려야 한다는 것

Next.js는 사용자가 방문할 가능성이 높은 경로를 미리 가져오고(prefetching), 클라이언트 측 전환(client-side transitions)을 수행하여 지연 문제를 해결한다

#### Prefetching

- 프리페칭은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 로드하는 프로세스
- 사용자가 링크를 클릭하기 전에 다음 경로를 렌더링하는데 필요한 데이터가 클라이언트 측에 이미 준비되어 있기 때문에 애플리케이션에서 경로 간 이동이 즉각적으로 느껴진다.
- Next.js 는 <Link> 컴포넌트와 연결된 경로를 자동으로 사용자 뷰포트에 미리 가져온다.
- <a> tag를 사용하면 프리페칭 하지 않는다.

경로의 어느 정도를 프리페칭할지는 정적 경로인지 동적 경로인지에 따라 달라짐

- 정적 경로 : 전체 경로가 프리페치 된다
- 동적 경로 : 프리페치를 건너뛰거나, loading.tsx가 있는 경우 경로가 부분적으로 프리페칭된다

- Next.js는 동적 라우팅을 건너뛰거나 부분적으로 프리페칭하는 방법으로 사용자가 방문하지 않을 수도 있는 경로에 대한 서버의 불필요한 작업을 방지한다.
  그러나 네비게이션 전에 서버 응답을 기다리면 사용자에게 앱이 응답하지 안흔ㄴ다는 인상을 줄 수도 있다.

- 동적 경로에 대한 네비게이션 환경을 개선하려면 스트리밍을 사용할 수 있다

#### Streaming(스트리밍)

- 스트리밍을 사용하면 서버가 전체 경로가 렌더링될 때까지 기다리지 않고, 동적 경로의 일부가 준비되는 즉시 클라이언트에 전송할 수 있다
- 즉 ,페이지으 ㅣ일부가 아직 로드 중이더라도 사용자는 더 빨리 콘텐츠를 볼 수 있다.
- 동적 경로의 경우, 미리 가져올 수있다는 뜻
- 즉, 공유 레이아웃과 로딩 스켈레톤을 미리 요청 할 수 있다

#### client-side transitions(클라이언트 측 전환)

- 일반적으로 서버 렌더링 페이지로 이동하면 전체 페이지가 로드된다
  이로 인해 state가 삭제되고, 스크롤 위치가 재설정되며, 상호작용이 차단된다

- next.js 는 <Link> 컴포넌트를 사용하는 클라이언트 측 전환을 통해 이를 방지하고 페이지를 다시 로딩하는 대신 다음과 같은 방법으로 콘텐츠를 동적으로 업데이트한다.

- 공유 레이아웃과 UI를 유지한다.
- 현재 페이지를 밀 가져온(pregetching) 로딩 상태 또는 사용 가능한 경우 새 페이지를 바꾼다.

- 클라이언트 측 전환은 서버에서 렌더링된 앱을 클라이언트에서 렌더링된 앱처럼 느껴지게 하는 요소이다.
- 또한 프리페칭 밑 스트리밍과 함께 사용하면 동적 경로에서도 빠른 전환이 가능하다

---

4주차
레이아웃 페이지

Route 방식 비교

---

3주차

페이지

---

2주차

레이아웃

---

1주차

폴더 생성
pnpm create-next-app@latest

서버실행
pnpm dev
