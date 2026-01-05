import SearchPage from '@/components/components/Search';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View } from 'react-native';
import { fetchWords } from '../home/queries/fetchWords';

export default function Search() {
  const { data } = useQuery({
    queryKey: ['words'],
    queryFn: fetchWords,
  });
  return <View style={{ flex: 1 }}>{data && <SearchPage data={data} />}</View>;
}
