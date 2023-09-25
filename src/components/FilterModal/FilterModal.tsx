import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {GStyle} from '../../utils';
import {SvgXml} from 'react-native-svg';
import svgIcons from '../../assets/svg';
import {useAppDispatch, useAppSelector} from '../../store/hooks/redux';
import {
  addTransaction,
  updateTransaction,
} from '../../store/AccountTransactionStore/AccountTransactionSlice';
import {allAccountTransaction, currentUserName} from '../../store/selectors';

interface IExpenseModal {
  id: number;
  close: () => undefined;
}

const FilterModal = (props: IExpenseModal) => {
  const {id, close} = props;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateDialogIsOpen, setdateDialogIsOpen] = useState(false);
  const [uniqueId, SetUniqueId] = useState(-1);
  const dispatch = useAppDispatch();
  const userName = useAppSelector(currentUserName);
  const data = useAppSelector(allAccountTransaction);

  useEffect(() => {
    if (id !== -1 && userName) {
      const location = data[userName].findIndex(item => {
        return item.uniqueId === id;
      });
      const info = data[userName][location];
      setTitle(info.title);
      setAmount(info.amount + '');
      setDate(new Date(info.date));

      SetUniqueId(info.uniqueId);

      console.log('info', info.date);
    } else {
      console.log('new record');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isDisable = title.length < 1 || amount.length < 0 || date === undefined;

  const processData = () => {
    if (date !== undefined && userName !== undefined) {
      if (id === -1) {
        dispatch(
          addTransaction({
            transaction: {
              title: title,
              amount: Number(amount),
              date: date,
            },
            userName: userName,
          }),
        );
      } else {
        dispatch(
          updateTransaction({
            transaction: {
              title: title,
              amount: Number(amount),
              date: date,
            },
            userName: userName,
            uniqueId: uniqueId,
          }),
        );
        // updateData();
      }
    }
    close();
  };

  const isNumberOrCommaOrMinus = (input: string) => {
    // Regular expression to match the valid format
    const regex = /^-?\d+(\.\d{0,2})?$/;

    return regex.test(input);
  };
  const validateNumberInput = (newText: string) => {
    if (
      isNumberOrCommaOrMinus(newText) ||
      newText.length === 0 ||
      !newText ||
      newText === '-'
    ) {
      console.log('VVV');
      const withoutCommasAndDots = newText.replace(',', '');
      setAmount(withoutCommasAndDots);
    } else {
      console.log('XX');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            close();
          }}>
          <SvgXml xml={svgIcons.x} width="20" height="20" />
        </TouchableOpacity>
        <Text style={GStyle.generalStyle.textTitle}>
          {id === -1 ? 'Create Expense' : 'Edit Expense'}
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <Text>{(title.length > 0 || id > -1) && 'Title'}</Text>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Title"
            onChangeText={newText => setTitle(newText)}
            value={title}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Text>{(amount || id > -1) && 'Amount'}</Text>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Amount"
            onChangeText={input => {
              validateNumberInput(input);
            }}
            value={amount}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Text>{(date || id > -1) && 'Date'}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setdateDialogIsOpen(true);
            }}>
            <TextInput
              onFocus={() => {
                setdateDialogIsOpen(true);
              }}
              style={styles.textInput}
              placeholder="Date"
              onChangeText={newText => setTitle(newText)}
              value={
                date === undefined ? '' : date?.toLocaleDateString('en-GB')
              }
              editable={false}
            />
          </TouchableOpacity>
        </View>

        <View style={[GStyle.generalStyle.center, styles.saveContainer]}>
          <TouchableOpacity
            disabled={isDisable}
            style={[styles.button, isDisable ? styles.gray : {}]}
            onPress={processData}>
            <Text style={[GStyle.generalStyle.textTitle, styles.white]}>
              {id === -1 ? 'Create' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          mode="date"
          open={dateDialogIsOpen}
          date={date || new Date()}
          onConfirm={dateInput => {
            setdateDialogIsOpen(false);
            setDate(dateInput);
          }}
          onCancel={() => {
            setdateDialogIsOpen(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: GStyle.colors.darkGray,
  },
  container: {
    height: Dimensions.get('window').height - 30,
    width: '100%',
    backgroundColor: GStyle.colors.white,
    position: 'relative',
    top: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24 * 2,
    paddingHorizontal: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  InputTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: '400',
    color: GStyle.colors.gray,
  },
  textInput: {
    borderBottomColor: GStyle.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    fontSize: 18,
    color: GStyle.colors.black,
  },
  inputContainer: {
    paddingBottom: 24,
  },
  white: {
    color: GStyle.colors.white,
  },
  button: {
    backgroundColor: GStyle.colors.purple,
    height: 50,
    borderRadius: 25,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  gray: {
    backgroundColor: GStyle.colors.darkGray,
  },
  saveContainer: {
    position: 'absolute',
    bottom: 62,
    width: Dimensions.get('screen').width,
  },
});
export default FilterModal;
