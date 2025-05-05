import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		Title: "",
		Ingredients: "",
		steps: "",
		cookingTime:""
	});
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProduct({ Title: "", Ingredients: "", steps: "",cookingTime:"" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Recipe
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Title'
							name='Title'
							value={newProduct.Title}
							onChange={(e) => setNewProduct({ ...newProduct, Title: e.target.value })}
						/>
						<Input
							placeholder='Ingredients'
							name='Ingredients'
							value={newProduct.Ingredients}
							onChange={(e) => setNewProduct({ ...newProduct, Ingredients: e.target.value })}
						/>
						<Input
							placeholder='steps'
							name='steps'
							type='number'
							value={newProduct.steps}
							onChange={(e) => setNewProduct({ ...newProduct, steps: e.target.value })}
						/>
						<Input
							placeholder='cookingTime'
							name='cookingTime'
							value={newProduct.cookingTime}
							onChange={(e) => setNewProduct({ ...newProduct, cookingTime: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Recipe
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
