import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { scrollIntoView } from "seamless-scroll-polyfill";
import "./App.css";
import { list } from "./data";

function App() {

  const [value, setValue] = useState(0);

  const handleChange = (e : React.SyntheticEvent<Element, Event>, newValue : number) => {
    setValue(newValue);
    if(document.getElementById(`menu_${newValue}`)){
      scrollIntoView(document.getElementById(`menu_${newValue}`)!, {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
    }
    
  };

  const handleScroll = () => {
      list.forEach((element, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          const intersectedDiv = entries.find((entry) => entry.isIntersecting === true);
          if (intersectedDiv) {
            const target = intersectedDiv.target.id.split("_");
            const intersectedDivIndex = target[1];
            setValue(parseInt(intersectedDivIndex, 10));
          }
        },
        { root: document.querySelector("#menuContainer"), threshold: 0.51 },
      );
      document.getElementById(`menu_${index}`) && observer.observe(document.getElementById(`menu_${index}`)!);
    });
    
  };


  return (
    <div className="app">
      <div className="menuWrapper">
        <div className="menuCategoryWrapper">
          {list.map((category, index) => (
            <Tabs value={value}  aria-label="basic tabs example" onChange={handleChange}>
              <Tab label={category.categoryName} className="menuCategories" value={index}></Tab>
            </Tabs>
          ))}
        </div>
        <div className="menuBody" onScroll={handleScroll} id={"#menuContainer"}>
          {list.map((category, index) => (
            <div key={category.categoryId} className="menuItemContainer" id={`menu_${index}`}>
              <div className="menuCategoryName">{category.categoryName}</div>
              <div className="menuItemWrapper">
                {category.items.map((item) => (
                  <div key={item.id} className="menuItem">
                    <div className="menuItemImageWrapper">
                      <img src={item.image} alt={item.name} className="menuItemImage"/>
                    </div>
                    <p className="menuItemName">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
