import React from "react";

function Die(props) {
  //adding dynamic styles to our die
  console.log(props.link);
  const styles = {
    backgroundColor: props.status === true ? "#59E391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={props.function}>
      <img
        src={`https://robohash.org/${props.value}?set=set2`}
        alt={`${props.value}`}
      />
    </div>
  );
}

export default Die;
