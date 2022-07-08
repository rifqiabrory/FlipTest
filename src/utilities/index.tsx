import { FilterOptions } from './Constant';
import type { Transaction } from '../types';

/**
 * Currency Options Interface
 */
export interface CurrencyOptions {
  precision?: number,
  separator?: string,
  delimiter?: string,
  prefix?: string,
  suffix?: string,
  ignoreNegative?: boolean,
  showPositiveSign?: boolean,
  signPosition?: string,
  sign?: string,
}

/**
 * Utilities Class
 */
class Utilities {

  /**
  * Filter Method
  * @param dataSource - Array<Transaction>
  * @param filterBy - string
  * @param keyword - string
  */
  static filterData = (dataSource: Array<Transaction>, filterBy: string, keyword: string) => {
    return dataSource.filter(item => {
      return (item.beneficiary_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
        item.sender_bank.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
        item.beneficiary_bank.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
        item.amount.toString().indexOf(keyword.toLowerCase()) > -1);
    }).sort((a, b) => {
      switch (filterBy) {
        case FilterOptions[1].value: {
          return a.beneficiary_name > b.beneficiary_name ? 1 : -1;
        }
        case FilterOptions[2].value: {
          return a.beneficiary_name > b.beneficiary_name ? -1 : 1;
        }
        case FilterOptions[3].value: {
          return a.created_at > b.created_at ? 1 : -1;
        }
        case FilterOptions[4].value: {
          return a.created_at > b.created_at ? -1 : 1;
        }
        default: {
          return 1
        }
      }
    })
  }

  /**
   * Currency Format Method
   * @param value - string
   * @param options - CurrencyOptions
   */
  static currencyFormat = (value: string, options?: CurrencyOptions) => {
    if (value === "" || value === '0.0' || value === '00' || value === '.00' || value === '0.00') {
      return '';
    }

    const input = value.replace(/[^0-9]+/g, '');
    const {
      precision,
      separator = ',',
      delimiter = '.',
      ignoreNegative,
      showPositiveSign,
      prefix = 'Rp',
      suffix = ''
    } = options || {};

    const negative = ignoreNegative ? false : input.length < 0;
    const sign = negative ? '-' : showPositiveSign ? '+' : '';
    const string = Math.abs(parseInt(input)).toFixed(precision);
    const parts = string.split('.');
    const buffer = [];
    let number = parts[0];
    while (number.length > 0) {
      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
      number = number.substr(0, number.length - 3);
    }

    let formattedNumber = '';
    formattedNumber = buffer.join(delimiter);

    const decimals = parts[1];
    if (!!precision && decimals) {
      formattedNumber += separator + decimals;
    }
    return `${prefix}${sign}${formattedNumber}${suffix}`
  }

  /**
  * Currency Format Function
  * @param datetime - string
  */
  static parseDateTime = (datetime: string) => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const date = datetime.split(" ")[0];
    const time = datetime.split(" ")[1];
    const bits = date.split(/\D/) as any;
    const datetimevalue = new Date(bits[0], --bits[1], bits[2]);
    const day = datetimevalue.getDate();
    const monthIndex = datetimevalue.getMonth();
    const year = datetimevalue.getFullYear();
    const fulldate = new Date(
      monthNames[monthIndex] + " " + day + "  " + year + " " + time
    );
    return fulldate.getDate() + " " + monthNames[fulldate.getMonth()] + " " + fulldate.getFullYear()
  }
}

/**
 * All Utilities & Modules
 */
export { FilterOptions, StatusColor, StatusChip, Strings } from './Constant';
export { ARROW_DOWN_ICON, ARROW_RIGHT_ICON, COPY_ICON, SEARCH_ICON } from './Icons';
export { Colors } from './Colors';
export default Utilities;