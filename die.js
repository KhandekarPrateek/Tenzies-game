import React from "react";

function Die(props) {
  //adding dynamic styles to our die

  const styles = {
    backgroundColor: props.status === true ? "#59E391" : "white",
  };

  return (
    <div className="die-face" style={styles} onClick={props.function}>
      <img src={`${props.link}`} alt={`${props.value}`} />
    </div>
  );
}

export default Die;
