import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (date) => {
    return dayjs(date).format("DD MMM YYYY, hh:mm A");
};

export const timeAgo = (date) => {
    return dayjs(date).fromNow();
};
