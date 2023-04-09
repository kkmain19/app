import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';


// const itemCardContainer = ({imageSrc, title, location}) =>{
//     return (
//         <TouchableOpacity className="rounded-md border border-gray-300 spacy-y-2 px-3 py-2 shadow-mc bg-white w-[182px] my-2">
//             <Image 
//                 source = {{ uri: imageSrc}}
//                 className = "w-full h-40 rounded-md object-cover" 
//             />

//             <Text className="text-[#428288] text-[18px] font-bold"> 
//                 {title?.length > 14 ? `${title.slice(0,14)}..` : title} 
//             </Text>
//         </TouchableOpacity>
//      );
// }

export default function itemCardContainer({imageSrc, title, location}) {
    return (
        <TouchableOpacity className="rounded-md border border-gray-300 spacy-y-2 px-3 py-2 shadow-mc bg-white w-[182px] my-2">

            <Text className="text-[#428288] text-[18px] font-bold"> 
                {title?.length > 14 ? `${title.slice(0,14)}..` : title} 
            </Text>
            
        </TouchableOpacity>
     );

    
}
