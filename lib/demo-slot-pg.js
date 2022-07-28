'use babel';

import DemoSlotPgView from './demo-slot-pg-view';
import { CompositeDisposable } from 'atom';

export default {

  demoSlotPgView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.demoSlotPgView = new DemoSlotPgView(state.demoSlotPgViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.demoSlotPgView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'demo-slot-pg:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.demoSlotPgView.destroy();
  },

  serialize() {
    return {
      demoSlotPgViewState: this.demoSlotPgView.serialize()
    };
  },

  toggle() {
    console.log('DemoSlotPg was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
