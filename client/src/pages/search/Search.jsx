import React from 'react'

function Search() {
    const [search, setSearch] = React.useState("");
    const handleChange = (event) => {
        const selectedCategory = event.target.value;
        console.log(`Selected category: ${selectedCategory}`);
        // You can add more logic here to filter or fetch data based on the selected category
    };
  return (
    <div>
      <label>
        Select activity category:
        <select
          name="type"
          value={search}
          className="input w-full"
          onChange={handleChange}
        >
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
      </label>
    </div>
  );
}

export default Search
