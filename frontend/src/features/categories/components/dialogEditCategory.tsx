import { pathCategory } from "@/services/category.services";
import { useState } from "react";
import { Dialog, Button, Flex,Text, TextField,} from "@radix-ui/themes";
import path from "path";

type DialogCategoryProps = {
  getCategoriesData: Function;
  id: string ;
  category_name: string ;
};
const DialogEdit = ({ getCategoriesData,id,category_name }: DialogCategoryProps) => {
  const [pathCategoryName, setPathCategoryName] = useState("");
  const handleUpdateCategory = async () => {
    if (!pathCategoryName) {
      alert("Please enter a category name.");
      return;
    }
    
    pathCategory({
        id:id,
        category_name: pathCategoryName
    })
      .then((response) => {
        if (response.statusCode === 200) {
          setPathCategoryName("");
          getCategoriesData();
        }else if (response.statusCode===400){
            alert(response.message);
        }else{
            alert(`Unexpected error: ${response.message}`);
        }
      })
      .catch((error) => {
        console.error("Error update category:",error.response?.data || error.message)
        alert("Faild to update category. Please try again.");
      });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1">Edit</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Category</Dialog.Title>
        
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              <strong>id:</strong>{id}
            </Text>
            </label>
            <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Beforre Category Name:<strong>{category_name}</strong>
            </Text>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">New Category Name</Text>
            <TextField.Root
            defaultValue=""
            placeholder="Enter your category name"
            onChange={(event)=>setPathCategoryName(event.target.value)} />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleUpdateCategory}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
export default DialogEdit