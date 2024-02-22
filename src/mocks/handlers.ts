import { http } from 'msw';

// Mock Data
export const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  {
    userId: 2,
    id: 5,
    title: 'second post title',
    body: 'second post body',
  },
  {
    userId: 3,
    id: 6,
    title: 'third post title',
    body: 'third post body',
  },
];

export const handlers = [
  // 여기서 api controller를 작성한다.
  // url에 일치하는 api 요청이 있을 때 mocking 한다.
  http.get('/test', ({ request }) => {
    console.log(request);
    new Response();
  }),
];
