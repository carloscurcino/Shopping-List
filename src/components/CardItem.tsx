import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FontAwesome } from '@expo/vector-icons';

// import { Container } from './styles';

export interface CardItemProps {
    id: number,
    name: string,
    icon: {
        library: string
        name: string,
        color: string
    },
    description: string,
    price: number,
}

interface CardItemComponentProps {
    item: CardItemProps;
    isSelected?: boolean;
    onAddPress: () => void;
    onRemovePress: () => void;
}

const CardItem: React.FC<CardItemComponentProps> = ({ item, isSelected, onAddPress, onRemovePress }) => {
    const IconComponent = (Icon as any)[item.icon.library];

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, backgroundColor: "#D9D9D9", paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8 }}>
            <View style={{ width: "15%", justifyContent: "flex-end" }}>
                {IconComponent && item.icon.name ? (
                    <IconComponent name={item.icon.name} size={32} color={item.icon.color} />
                ) : (
                    <Text>Ícone não disponível</Text>
                )}
            </View>
            <View style={{ flex: 1 }}>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
            </View>

            {!isSelected ? (
                <TouchableOpacity onPress={onAddPress}>
                    <View style={{ alignItems: "center", borderRadius: 8, backgroundColor: "#058EFF", padding: 8 }}>
                        {/* <Text style={{ color: "white" }}>Adicionar item</Text> */}
                        <FontAwesome6 name="plus" size={16} color="white" />
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onRemovePress}>
                    <View style={{ alignItems: "center", borderRadius: 8, backgroundColor: "#d10c0c", padding: 8 }}>
                        {/* <Text style={{ color: "white" }}>Adicionar item</Text> */}
                        <FontAwesome name="remove" size={16} color="white" />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default CardItem;