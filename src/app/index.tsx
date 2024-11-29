import { View, Text, TextInput, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CardItem, { CardItemProps } from '@/components/CardItem'
import { shopping_data } from '@/utils/data';

export default function Home() {
    const [selectedItems, setSelectedItems] = useState<CardItemProps[]>([])

    const [selectedTab, setSelectedTab] = useState<string>("list")
    const [searchText, setSearchText] = useState<string | null>("")

    const TAB_CONFIG = [
        {
            label: "Todos Itens",
            value: "all-items",
        },
        {
            label: "Minha Lista",
            value: "list",
        },
        {
            label: "Últimas compras",
            value: "last-buys",
        }
    ]

    const handleChangeTab = (tabName: string) => {
        setSelectedTab(tabName)

        setSearchText(null)
    }

    const handleAddItem = (item: CardItemProps) => {
        setSelectedItems((prevItems) => {
            const itemExists = prevItems.find((selectedItem) => selectedItem.id === item.id);

            if (itemExists) {
                return prevItems.map((selectedItem) =>
                    selectedItem.id === item.id
                        ? { ...selectedItem, quantity: (selectedItem.quantity || 0) + 1 }
                        : selectedItem
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
        ToastAndroid.show('Adicionado com sucesso!', ToastAndroid.SHORT);
    };

    const handleRemoveItem = (item: CardItemProps) => {
        setSelectedItems((prevItems) => {
            const itemExists = prevItems.find((selectedItem) => selectedItem.id === item.id);

            if (itemExists) {
                if (itemExists.quantity && itemExists.quantity > 1) {
                    return prevItems.map((selectedItem) =>
                        selectedItem.id === item.id
                            ? { ...selectedItem, quantity: selectedItem.quantity! - 1 }
                            : selectedItem
                    );
                } else {
                    return prevItems.filter((selectedItem) => selectedItem.id !== item.id);
                }
            }
            return prevItems; // Retorna a lista sem alterações caso o item não exista
        });
        ToastAndroid.show('Removido com sucesso!', ToastAndroid.SHORT);
    };


    return (
        <View style={{ height: "100%", paddingHorizontal: 10, paddingVertical: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginBottom: 14 }}>Shopping List</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {TAB_CONFIG.map(tab => (
                    <TouchableOpacity key={tab.value} onPress={() => handleChangeTab(tab.value)}>
                        <Text style={{ fontSize: selectedTab === tab.value ? 18 : 12, color: "#000", borderBottomWidth: selectedTab === tab.value ? 1 : 0, borderBottomColor: "#058EFF" }}>{tab.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <View style={{ marginTop: 20, paddingBottom: 100 }}>
                {selectedTab === "list" && (
                    <View style={{ height: "100%", flexDirection: "column", justifyContent: "space-between", marginBottom: 10 }}>
                        <FlatList
                            data={selectedItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) =>
                                <CardItem
                                    item={item}
                                    isSelected
                                    onAddPress={() => console.log("adicionado")}
                                    onRemovePress={() => {
                                        handleRemoveItem(item);
                                    }} />
                            }
                            ListEmptyComponent={
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Nenhum item encontrado</Text>
                                    <TouchableOpacity onPress={() => setSelectedTab("all-items")}>
                                        <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#058EFF", textAlign: "center" }}>Adicionar items</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <TouchableOpacity onPress={() => console.log("all-items")}>
                            <View style={{ marginTop: 0, backgroundColor: "#058EFF", paddingVertical: 10, borderRadius: 10 }}>
                                <Text style={{ fontSize: 16, color: "white", textAlign: "center" }}>Finalizar compra</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                {selectedTab === "all-items" && (
                    <View style={{ flexDirection: "column", justifyContent: "space-between", marginBottom: 10, gap: 18 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
                            <TextInput
                                placeholder='Buscar item para compra'
                                onChangeText={(text) => setSearchText(text)}
                                style={{ flex: 1, backgroundColor: "#f3f1f1", paddingHorizontal: 8, paddingVertical: 10, borderRadius: 8 }}
                            />
                        </View>

                        <FlatList
                            data={shopping_data.filter(item =>
                                searchText ? item.name.toLowerCase().includes(searchText.toLowerCase()) : true
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) =>
                                <CardItem
                                    item={item}
                                    onAddPress={() => {
                                        handleAddItem(item);
                                    }}
                                    onRemovePress={() => console.log("removido")} />
                            }
                        />
                    </View>
                )}

                {selectedTab === "last-buys" && (
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 18 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Não há últimas compras</Text>
                    </View>
                )}
            </View>

        </View>
    )
}