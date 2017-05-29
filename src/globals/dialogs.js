import { Dialog } from 'quasar'

export default {
  confirmDelete (item, callback) {
    Dialog.create({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete this ${item}?`,
      buttons: [
        'Cancel',
        {
          label: 'Yes',
          handler () {
            callback()
          }
        }
      ]
    })
  }
}
