import * as React from "react";
import data from "./data.json";

export default function SandwichDetails(props) {
  const { sandwichName } = props;
  const sandwich = data.menu.filter(
    (sandwich) => sandwich.name === sandwichName
  );
  return (
    <div role="alert">
      {sandwich.map((item, index) => (
        <div id="SandwichDesc" key={index}>
          <p>Name: {item.name}</p>
          <p>Price: ${item.price}</p>
          <Ingrediants content={item.ingredients} />
        </div>
      ))}
    </div>
  );
}

const Ingrediants = ({ content }) => {
  let ingredientsStr = "Ingredients: ";
  Object.entries(content).map((entry) => {
    ingredientsStr += entry[1] + " x " + entry[0] + ", ";
  });
  ingredientsStr = ingredientsStr.substr(0, ingredientsStr.length - 2);
  return <p>{ingredientsStr}</p>;
};
