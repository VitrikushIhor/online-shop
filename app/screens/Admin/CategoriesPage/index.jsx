import {CreateCategories} from "./CreateCategories";
import {useState} from "react";
import {CategoriesList} from "./CategoriesList";

export const CategoriesPage = ({categories}) => {
	const [data, setData] = useState(categories)
	return (
		 <div>
			 <CreateCategories setCategories={setData}/>
			 <CategoriesList setCategories={setData} categories={data}/>
		 </div>
	);
};

