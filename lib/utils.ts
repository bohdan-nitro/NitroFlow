import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDiff = now.getTime() - createdAt.getTime();

  // Функция для получения числа с окончанием в зависимости от числа
  const getRelativeTime = (value:number, unit:string) => {
    const roundedValue = Math.round(value);
    return `${roundedValue} ${unit}${roundedValue !== 1 ? 's' : ''}`;
  };

  // В зависимости от временного интервала возвращаем соответствующее относительное время
  if (timeDiff < 60000) {
    const seconds = timeDiff / 1000;
    return getRelativeTime(seconds, 'second') + ' ago';
  } else if (timeDiff < 3600000) {
    const minutes = timeDiff / 60000;
    return getRelativeTime(minutes, 'minute') + ' ago';
  } else if (timeDiff < 86400000) {
    const hours = timeDiff / 3600000;
    return getRelativeTime(hours, 'hour') + ' ago';
  } else if (timeDiff < 2592000000) {
    const days = timeDiff / 86400000;
    return getRelativeTime(days, 'day') + ' ago';
  } else if (timeDiff < 31536000000) {
    const months = timeDiff / 2592000000;
    return getRelativeTime(months, 'month') + ' ago';
  } else {
    const years = timeDiff / 31536000000;
    return getRelativeTime(years, 'year') + ' ago';
  }

}

export const formatDividerNumber = (num: number): string => {
  if(num >= 1000000){
    const formatedNum = (num / 1000000).toFixed(1)
    return `${formatedNum}M`
  } else if (num >= 1000) {
    const formatedNum = (num / 1000).toFixed(1)
    return `${formatedNum}K`
  } else {
    return num.toString()
  }
}