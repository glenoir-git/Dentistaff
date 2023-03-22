import directoryGroupConst from "./directory.group.const";
import { IMenuDirectory } from "./directory.interface";

export const MenuDirectory: Array<IMenuDirectory> = [
  {
    title: 'Admin',
    color: 'white',
    background: '#E0E0E0',
    childrens: directoryGroupConst,
    icon: 'ion ion-ios-git-compare',
    baseLink: 'group',
    rotated: false,
    active: false,
  },
];
