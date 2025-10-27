/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation> */
import { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { type ItemStorage, itemsStorage } from "@/storage/itemStorage";
import { FilterStatus } from "../types/FilterStatus";
import { styles } from "./styles";

const filterStatus: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];
// const items = [
// 	{
// 		id: "1",
// 		status: FilterStatus.DONE,
// 		description: "1 cafe",
// 	},
// 	{
// 		id: "2",
// 		status: FilterStatus.PENDING,
// 		description: "3 macarrao",
// 	},
// 	{
// 		id: "3",
// 		status: FilterStatus.PENDING,
// 		description: "3 cebolas",
// 	},
// ];

export function Home() {
	const [filter, setFilter] = useState(FilterStatus.PENDING);
	const [description, setDescription] = useState("");
	const [items, setItems] = useState<ItemStorage[]>([]);

	async function handleAdd() {
		if (!description.trim()) {
			return Alert.alert(
				"Adicionar item:",
				"Informe a descrição para adicionar!",
			);
		}

		const newItem = {
			id: Math.random().toString(36).substring(2),
			description,
			status: FilterStatus.PENDING,
		};

		await itemsStorage.add(newItem);
		await getItemsByStatus();

		Alert.alert("Adicionado: ", `Adicionado ${description}`);

		setFilter(FilterStatus.PENDING);

		setDescription("");
	}

	async function handleRemove(id: string) {
		try {
			await itemsStorage.remove(id);
			await getItemsByStatus();
		} catch (error) {
			console.error(error);
			Alert.alert("Remover: ", "Não foi possível remover o item.");
		}
	}

	async function getItemsByStatus() {
		try {
			const response = await itemsStorage.getByStatus(filter);

			setItems(response);
		} catch (error) {
			console.error(error);
			Alert.alert("ERRO: ", "Não foi possível obter os items salvos.");
		}
	}

	function handleClear() {
		Alert.alert("Limpar", "Deseja limpar todos?", [
			{ text: "Não", style: "cancel" },
			{ text: "Sim", onPress: () => onClear() },
		]);
	}

	async function onClear() {
		try {
			await itemsStorage.clear();
			setItems([]);
		} catch (error) {
			console.error(error);
			Alert.alert("ERRO", "Não foi possível remover os items.");
		}
	}

	async function handleToggleItemStatus(id: string) {
		try {
			await itemsStorage.toggleStatus(id);
			await getItemsByStatus();
		} catch (error) {
			console.error(error);
			Alert.alert("ERRO", "Não foi possível atualizar o status.");
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getItemsByStatus();
	}, [filter]);

	return (
		<View style={styles.container}>
			<Image source={require("@/assets/logo.png")} style={styles.logo} />

			<View style={styles.form}>
				<Input
					placeholder="O que vc precisa comprar?"
					onChangeText={(value) => setDescription(value)}
					value={description}
				/>

				<Button title="Adicionar" onPress={handleAdd} />
			</View>

			<View style={styles.content}>
				<View style={styles.header}>
					{filterStatus.map((status) => (
						<Filter
							key={status}
							status={status}
							isActive={status === filter}
							onPress={() => setFilter(status)}
						/>
					))}

					<TouchableOpacity style={styles.clearButton} onPress={handleClear}>
						<Text style={styles.clearText}>Limpar</Text>
					</TouchableOpacity>
				</View>

				<FlatList
					data={items}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Item
							data={{
								status: item.status,
								description: item.description,
							}}
							onStatus={() => handleToggleItemStatus(item.id)}
							onRemove={() => handleRemove(item.id)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={() => (
						<Text style={styles.empty}>Lista vazia.</Text>
					)}
				/>
			</View>
		</View>
	);
}
