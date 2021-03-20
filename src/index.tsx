import React from "react";

const SayHello = ({ name }: { name: string }): JSX.Element => (
    <div>Hey {name}, say hello to TypeScript2.</div>
);

export default SayHello;
