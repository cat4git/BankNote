import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppSelector} from '../../store/hooks/redux';
import {allAccountTransaction, currentUserName} from '../../store/selectors';
import {GStyle} from '../../utils';
import {ExpenseModal} from '../assets';

const MainScreen = () => {
  const data = useAppSelector(allAccountTransaction);
  const userName = useAppSelector(currentUserName) || '';
  const [displayModalID, setDisplayModalID] = useState<number | undefined>(
    undefined,
  );

  const sum = data[userName]?.reduce((sum, item) => sum + item.amount, 0) || 0;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.text}>Total Expenses:</Text>
        <Text style={styles.amount}>$ </Text>
        <Text style={styles.amount}>{Math.floor(sum)} </Text>
        {sum > 0 ? (
          <View>
            <Text style={styles.amountSub}>.</Text>
            <Text style={styles.amountSub}>
              {Number(sum.toFixed(2).split('.')[1])}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}> Filters</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.Plus} onPress={() => {}}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
        <View style={styles.footerButtonContainer}>
          <View style={styles.footerButton}>
            <Text style={styles.homeButtonText}> Home</Text>
          </View>
          <View style={styles.footerButton}>
            <Text style={styles.profileButtonText}> Profile</Text>
          </View>
        </View>
      </View>
      {displayModalID !== undefined && (
        <ExpenseModal
          id={displayModalID}
          close={() => {
            setDisplayModalID(undefined);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: GStyle.colors.black,
    paddingEnd: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: '400',
    color: GStyle.colors.black,
  },
  amountSub: {
    fontSize: 16,
    fontWeight: '400',
    color: GStyle.colors.black,
  },
  filterContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  filter: {
    borderRadius: 20,
    backgroundColor: GStyle.colors.gray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginEnd: 16,
  },
  filterText: {
    color: GStyle.colors.black,
    fontSize: 12,
    width: 'auto',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0, // Places the element at the bottom of the screen
    left: 0, // Aligns the element to the left
    right: 0, // Aligns the element to the right
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: GStyle.colors.gray,
    padding: 10,
    alignItems: 'center',
  },
  Plus: {
    backgroundColor: GStyle.colors.blue,
    height: 56,
    width: 56,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 456,
    bottom: 56 / 2 + 15,
    alignItems: 'center',
    alignContent: 'center',
  },
  plusIcon: {
    fontSize: 50,
    color: GStyle.colors.white,
    fontWeight: '200',
    bottom: 15 / 2,
  },
  footerButtonContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerButton: {
    alignContent: 'center',
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
  },
  homeButtonText: {
    fontSize: 12,
    color: GStyle.colors.blue,
  },
  profileButtonText: {
    fontSize: 12,
    color: GStyle.colors.darkGray,
  },
});
export default MainScreen;
