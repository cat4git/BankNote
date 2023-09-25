import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks/redux';
import {
  allAccountTransactionSelector,
  currentUserNameSelector,
} from '../../store/selectors';
import {GStyle} from '../../utils';
import {ExpenseModal, FilterModal} from '../../components';
import svgIcons from '../../assets/svg';
import {SvgXml} from 'react-native-svg';
import {IBankingTransaction} from '../../store/AccountTransactionStore/AccountTransactionStoreInterface';
import {deleteTransaction} from '../../store/AccountTransactionStore/AccountTransactionSlice';
import LogOutSectionModal from '../../components/LogOutSectionModal/LogOutSection';

const MainScreen = () => {
  const [pageDisplay, setPageDisplay] = useState<'details' | 'logout'>(
    'details',
  );
  const data = useAppSelector(allAccountTransactionSelector);
  const userName = useAppSelector(currentUserNameSelector) || '';
  const [displayModalID, setDisplayModalID] = useState<number | undefined>(
    undefined,
  );
  const [displayFilter, setDisplayFilter] = useState(false);
  const dispatch = useAppDispatch();

  const sum =
    data[userName]?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
  const filterData = data[userName];

  const groupedByDate: Record<string, IBankingTransaction[]> = {};

  // Group objects by formatted date string
  filterData?.forEach(item => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-GB');
    if (!groupedByDate[formattedDate]) {
      groupedByDate[formattedDate] = [];
    }

    groupedByDate[formattedDate].push(item);
  });

  const groupedByDateKey = Object.keys(groupedByDate);

  return (
    <SafeAreaView style={styles.container}>
      {pageDisplay === 'details' ? (
        <>
          <View style={styles.title}>
            <Text style={styles.text}>Total Expenses:</Text>
            <Text style={styles.amount}>$ </Text>
            <Text style={styles.amount}>{Math.floor(sum)} </Text>
            {sum > 0 ? (
              <View style={GStyle.generalStyle.flexRow}>
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
            <TouchableOpacity
              style={styles.filter}
              onPress={() => {
                setDisplayFilter(true);
              }}>
              <SvgXml xml={svgIcons.filter} width="10" height="10" />
              <Text style={styles.filterText}> Filters</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{marginHorizontal: 20, marginTop: 10}}>
            {groupedByDateKey?.map(dateKey => {
              return (
                <View key={dateKey}>
                  <View style={styles.dateHeaderContainer}>
                    <Text style={styles.dateHeaderText}>{dateKey}</Text>
                  </View>
                  {groupedByDate[dateKey]?.map((item, index) => {
                    return (
                      <View
                        key={item.uniqueId}
                        style={[
                          styles.line,
                          index !== 0 ? styles.lineBorder : {},
                        ]}>
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              'Deletion confirmation',
                              `You are about to delete the ${item.title}`,
                              [
                                {
                                  text: 'Approval',
                                  onPress: () => {
                                    dispatch(
                                      deleteTransaction({
                                        uniqueId: item.uniqueId,
                                        userName: userName,
                                      }),
                                    );
                                  },
                                  style: 'default',
                                },
                                {
                                  text: 'Cancel',
                                  onPress: () => {},
                                  style: 'cancel',
                                },
                              ],
                            );
                          }}>
                          <SvgXml xml={svgIcons.x} width="20" height="20" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            GStyle.generalStyle.center,
                            GStyle.generalStyle.alignCenter,
                          ]}
                          onPress={() => {
                            setDisplayModalID(item.uniqueId);
                          }}>
                          <View style={styles.titleContainer}>
                            <Text style={styles.lineTitle}>{item.title}</Text>
                          </View>
                          <View>
                            <View
                              style={[
                                GStyle.generalStyle.flexRow,
                                GStyle.generalStyle.alignEnd,
                              ]}>
                              <Text style={styles.amountSubList}>$ </Text>
                              <Text style={styles.amount}>
                                {Math.floor(item.amount)}
                              </Text>
                              {item.amount > 0 ? (
                                <View
                                  style={[
                                    GStyle.generalStyle.flexRow,
                                    GStyle.generalStyle.alignEnd,
                                  ]}>
                                  <Text style={styles.amountSubList}>.</Text>
                                  <Text style={styles.amountSubList}>
                                    {(
                                      ((Math.round(item.amount * 100) / 100) %
                                        1) *
                                      100
                                    ).toFixed(0)}
                                  </Text>
                                </View>
                              ) : (
                                <></>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <LogOutSectionModal length={data[userName].length} />
      )}

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.Plus}
          onPress={() => {
            setDisplayModalID(-1);
          }}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => {
              setPageDisplay('details');
            }}>
            <Text
              style={
                pageDisplay === 'details'
                  ? styles.selectButtonText
                  : styles.nonSelectButtonText
              }>
              {' '}
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => {
              setPageDisplay('logout');
            }}>
            <Text
              style={
                pageDisplay === 'logout'
                  ? styles.selectButtonText
                  : styles.nonSelectButtonText
              }>
              {' '}
              Profile
            </Text>
          </TouchableOpacity>
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
      {displayFilter && (
        <FilterModal
          close={() => {
            setDisplayFilter(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
  amountSubList: {
    fontSize: 14,
    fontWeight: '400',
    color: GStyle.colors.black,
  },
  filterContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  filter: {
    borderRadius: 25,
    backgroundColor: GStyle.colors.gray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginEnd: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: GStyle.colors.white,
  },
  Plus: {
    backgroundColor: GStyle.colors.blue,
    height: 56,
    width: 56,
    borderRadius: 50,
    position: 'absolute',
    zIndex: 456,
    bottom: 56 / 2 + 10,
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
  selectButtonText: {
    fontSize: 12,
    color: GStyle.colors.blue,
  },
  nonSelectButtonText: {
    fontSize: 12,
    color: GStyle.colors.darkGray,
  },
  line: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineBorder: {
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: GStyle.colors.black,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.9,
  },
  lineTitle: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
    lineHeight: 16,
    color: GStyle.colors.dark,
  },
  dateHeaderContainer: {
    backgroundColor: GStyle.colors.lightGray,
  },
  dateHeaderText: {
    fontSize: 14,
    color: GStyle.colors.black,
    marginHorizontal: 16,
    marginVertical: 5,
  },
});
export default MainScreen;
