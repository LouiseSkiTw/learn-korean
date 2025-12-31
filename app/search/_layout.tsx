import SearchPage from '@/components/components/Search';
import data from '@/utils/quizData';
import React from 'react';
import { View } from 'react-native';

export default function Search() {
  return (
    <View style={{ flex: 1 }}>
      <SearchPage data={data} />
    </View>
  );
}
