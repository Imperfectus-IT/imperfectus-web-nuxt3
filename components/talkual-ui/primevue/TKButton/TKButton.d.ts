import { ButtonHTMLAttributes } from 'vue';

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
    style?: any;
    class?: any;
    label?: string | undefined;
    icon?: string | undefined;
    iconPos?: 'left' | 'right' | 'top' | 'bottom' | undefined;
    iconClass?: string | undefined;
    badge?: string | undefined;
    badgeClass?: string | undefined;
    badgeSeverity?: 'info' | 'success' | 'warning' | 'danger' | string | null | undefined;
    loading?: boolean | undefined;
    loadingIcon?: string | undefined;
    link?: boolean | undefined;
    severity?: 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | string | undefined;
    raised?: boolean | undefined;
    rounded?: boolean | undefined;
    text?: boolean | undefined;
    outlined?: boolean | undefined;
    size?: 'small' | 'large' | undefined;
    plain?: boolean | undefined;
    pt?: any;
    ptOptions?: any;
    unstyled?: boolean;
}
