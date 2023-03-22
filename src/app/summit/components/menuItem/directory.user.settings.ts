import { Logout } from "src/app/store/auth/auth.actions";

export default [
  {
    label: 'User',
    items: [
      {
        label: 'Compte',
        icon: 'ion ion-ios-person',
        routerLink: ['/user/profil'],
      },
      {
        label: 'Logout',
        icon: 'ion ion-ios-log-out',
        class: 'text-red-600 text-bold',
        command: (vue: any, ctx: any) => {
          vue.zone.run(() => {
            vue.confirmationService.confirm({
              key: 'logout',
              message: "Logout ?",
              accept: () => {
                vue.store.dispatch(new Logout());
              },
              reject: () => {
                vue.confirmationService.close();
              }
            });
          });
        },
      },
    ],
  },
];
