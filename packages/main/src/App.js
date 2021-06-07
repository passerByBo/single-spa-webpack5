import React from 'react';
const { lazy, Suspense } = React;
const Button = lazy(() => import('sub/Button'));
const App = () => (
  <div>
    <h3>基础的Remote微前端应用</h3>
    <h2>组件</h2>
    <hr />
    <Suspense fallback="loading....">
      {/* <Button /> */}
    </Suspense>
  </div>
);

export default App;
