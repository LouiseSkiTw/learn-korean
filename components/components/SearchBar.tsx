import { SearchIcon } from 'lucide-react-native';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({
  handleSearch,
  value,
}: {
  handleSearch: (text: string) => void;
  value: string;
}) => {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon />
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
  },
});

export default SearchBar;
