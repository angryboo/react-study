import React from 'react';

type ChildProps = {
  title: string;
  onclick: (name: string) => void;
};

const Child = ({ title, onclick }: ChildProps) => (
  <div>
    Hello, {title}
    <button onClick={() => onclick('ts 괜찮다')}>버튼클릭</button>
  </div>
);

Child.defaultProps = {
  title: '!!!!!!!',
};

export default Child;
