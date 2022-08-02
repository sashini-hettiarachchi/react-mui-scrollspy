import "./App.css";
import { list } from "./data";

function App() {
  return (
    <div className="app">
      <div className="menuWrapper">
        <div className="menuCategoryWrapper">
          {list.map((category) => (
            <div key={category.categoryId} className="menuCategories">{category.categoryName}</div>
          ))}
        </div>
        <div className="menuBody">
          {list.map((category) => (
            <div key={category.categoryId} className="menuItemContainer">
              <div className="menuCategoryName">{category.categoryName}</div>
              <div className="menuItemWrapper">
                {category.items.map((item) => (
                  <div key={item.id} className="menuItem">
                    <img src={item.image} alt={item.name} className="menuItemImage"/>
                    <p>{item.name}</p>
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
