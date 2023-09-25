import React, {useState} from 'react';
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
  filterByDateSelector,
  filterByTextSelector,
} from '../../store/selectors';
import {setFilters} from '../../store/AccountTransactionStore/AccountTransactionSlice';

interface IExpenseModal {
  close: () => undefined;
}

const FilterModal = (props: IExpenseModal) => {
  const {close} = props;
  const filterByText = useAppSelector(filterByTextSelector);
  const filterByDate = useAppSelector(filterByDateSelector);
  const [title, setTitle] = useState<string | undefined>(filterByText);
  const [date, setDate] = useState<Date | undefined>(
    filterByDate ? new Date(filterByDate) : undefined,
  );
  const [dateDialogIsOpen, setdateDialogIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => {
              setTitle('');
              setDate(undefined);
            }}>
            <Text style={styles.cleanText}>clean</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity
            onPress={() => {
              close();
            }}>
            <SvgXml xml={svgIcons.x} width="20" height="20" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text>{title && title.length > 0 && 'Title'}</Text>
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
            <Text>{date && 'Date'}</Text>
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
        {dateDialogIsOpen && (
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
        )}
      </View>
      <View style={[GStyle.generalStyle.center, styles.saveContainer]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(
              setFilters({
                date: date ? date.toISOString() : undefined,
                text: title,
              }),
            );
            close();
          }}>
          <Text style={[GStyle.generalStyle.textTitle, styles.white]}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: GStyle.colors.darkGray_70,
  },
  container: {
    height: Dimensions.get('window').height - 230,
    width: '100%',
    backgroundColor: GStyle.colors.white,
    position: 'relative',
    top: 230,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  textInput: {
    borderBottomColor: GStyle.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    fontSize: 18,
    color: GStyle.colors.black,
  },
  inputContainer: {
    paddingBottom: 24,
    paddingRight: 28,
  },
  white: {
    color: GStyle.colors.white,
    fontSize: 16,
    fontWeight: '700',
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
  saveContainer: {
    position: 'absolute',
    bottom: 62,
    width: Dimensions.get('screen').width,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cleanText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    lineHeight: 16,
    color: GStyle.colors.blue,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    lineHeight: 21,
    color: GStyle.colors.black,
  },
});
export default FilterModal;
