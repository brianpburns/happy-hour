import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFilterPubs } from 'src/features/shared/hooks/use-filter-pubs';
import { HappyHourStatus } from 'src/types';
import { FilterButton } from './filter-button';

export const Filters = () => {
  const [filter, setFilter] = useState<'all' | HappyHourStatus>('all');
  const filterPubs = useFilterPubs();

  const handleFilterPress = (status: HappyHourStatus | 'all') => {
    filterPubs(status);
    setFilter(status);
  };

  return (
    <View style={styles.filterWrapper}>
      <FilterButton
        filter="all"
        activeFilter={filter}
        handleFilterPress={handleFilterPress}
        color="grey"
      />
      <FilterButton
        filter="active"
        activeFilter={filter}
        handleFilterPress={handleFilterPress}
        color="green"
      />
      <FilterButton
        filter="soon"
        activeFilter={filter}
        handleFilterPress={handleFilterPress}
        color="orange"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrapper: {
    flexDirection: 'row',
  },
});
