import { useEffect, useState } from "react";
import { Table, Card, Flex, Text } from "@radix-ui/themes";
import { getCategories } from "@/services/category.services";
import { TypeCategoriesAll } from "@/types/response/response.category";
import DialogAdd from "./components/dialogAddCategory";
import DialogEdit from "./components/dialogEditCategory";
import AlertDialogDelete from "./components/dialogDeleteCategory";

export default function CategoriesFeature() {
  const [categories, setCategories] = useState<TypeCategoriesAll[]>([]);
  const getCategoriesData = () => {
    getCategories().then((res) => {
      setCategories(res.responseObject);
    });
  };
  useEffect(() => {
    getCategoriesData();
  }, []);
  return (
    <div className="comtainer w-full pt-2">
      <Card variant="surface" className="w-600 m-auto">
        <Flex className="w-full" direction="row" gap="2">
          <Text as="div" size="2" weight="bold">Categories</Text>
          <DialogAdd getCategoriesData={getCategoriesData} />
        </Flex>
        <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {categories &&
            categories.map((category: TypeCategoriesAll) => (
              <Table.Row key={category.id}>
                <Table.RowHeaderCell>{category.id}</Table.RowHeaderCell>
                <Table.Cell>{category.category_name}</Table.Cell>
                <Table.Cell>
                  <DialogEdit 
                  getCategoriesData={getCategoriesData}
                  id={category.id}
                  category_name={category.category_name}
                  ></DialogEdit>
                </Table.Cell>
                <Table.Cell><AlertDialogDelete
                getCategoriesData={getCategoriesData}
                id={category.id}
                category_name={category.category_name}/></Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      </Card>
      
    </div>
  );
}
