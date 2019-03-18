import zh_CN from './zh_CN';
import en_US from './en_US';

export enum LocaleType {
    en_US = 'en_US',
    zh_CN = 'zh_CN'
}

export const LocaleInfo = [
    {
        name: 'English',
        value: LocaleType.en_US
    },
    {
        name: '中文',
        value: LocaleType.zh_CN
    }
];

export {
    zh_CN,
    en_US
};
