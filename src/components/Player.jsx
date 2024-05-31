//using refs and portals
import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  //using refs : they are a special kind of variable provided by the useRef hook in react
  const PlayerName = useRef();

  //set the player name to null initially
  const [enteredplayerName, setPlayerName] = useState("");

  function handleClick() {
    //refs provide their variables with '.current' operator
    setPlayerName(PlayerName.current.value);
    //this sets the text in the input box back to NULL
    //but here we are directly accessing the DOM ,but in react we should always allow react to handle the DOM .In this case its ok because we are just using the value to just set the name and nothing else.Let's see how to acces the DOM using refs
    PlayerName.current.value = "";
  }
  return (
    <section id="player">
      {/* Double question mark in JS is a shortcut for the ternary operator */}
      <h2>Welcome {enteredplayerName ?? "Player Unknown"}</h2>
      <p>
        <input type="text" ref={PlayerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
 