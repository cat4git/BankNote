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
  filterByDateSelector,
  filterByTextSelector,
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
  const filterByText = useAppSelector(filterByTextSelector);
  const filterByDate = useAppSelector(filterByDateSelector);
  const userName = useAppSelector(currentUserNameSelector) || '';
  const [displayModalID, setDisplayModalID] = useState<number | undefined>(
    undefined,
  );
  const [displayFilter, setDisplayFilter] = useState(false);
  const dispatch = useAppDispatch();

  const areDatesOnSameDay = (
    isoDateString1: string,
    isoDateString2: string,
  ): boolean => {
    const date1 = new Date(isoDateString1);
    const date2 = new Date(isoDateString2);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const filterData = data[userName]
    .filter(
      item =>
        !filterByText ||
        (filterByText && item.title.indexOf(filterByText) > -1),
    )
    .filter(
      item =>
        !filterByDate ||
        (filterByDate && areDatesOnSameDay(item.date, filterByDate)),
    );

  const sum =
    filterData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
  const groupedByDate: Record<string, IBankingTransaction[]> = {};

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
          <View style={styles.scrollContainer}>
            <ScrollView style={styles.scrollView}>
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
          </View>
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
    bottom: 0,
    left: 0,
    right: 0,
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
  scrollContainer: {
    marginBottom: 170,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
export default MainScreen;
