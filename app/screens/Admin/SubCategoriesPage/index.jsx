import {useState} from "react";
import {SubCategoriesCreate} from "./SubCategoriesCreate";
import {SubCategoriesList} from "./SubCategoriesList";

export const SubCategoriesPage = ({categories, subCategories}) => {
	const [data, setData] = useState(subCategories);
	return (
		 <div>
			 <SubCategoriesCreate setSubCategories={setData} categories={categories}/>
			 <SubCategoriesList setSubCategories={setData} categories={categories} subCategories={subCategories}/>
		 </div>
	);
};

