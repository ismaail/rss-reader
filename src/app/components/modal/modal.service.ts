import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
    private modals: ModalComponent[] = [];

    /**
     * Add modal to array of active modals
     *
     * @param {ModalComponent} modal
     */
    add(modal: ModalComponent): void {
        this.modals.push(modal);
    }

    /**
     * Find Modal in modal list
     *
     * @param {string} id
     * @returns {ModalComponent}
     */
    find(id: string): ModalComponent {
        return this.modals.find((element) => {
            return element.id === id;
        });
    }

    /**
     * Find Modal in modals list & return its index if found
     *
     * @param {string} id
     * @returns {number}
     */
    findIndex(id: string): number {
        return this.modals.findIndex((element) => {
            return element.id === id;
        });
    }

    /**
     * Open modal specified by id
     *
     * @param {string} id
     */
    open(id: string): void {
        let modal = this.find(id);

        if (! modal) {
            return;
        }

        modal.open();
    }

    /**
     * Remove modal from array of active modals
     *
     * @param {string} id
     */
    remove(id: string): void {
        let index = this.findIndex(id);

        if (! index) {
            return;
        }

        this.modals.splice(index, 1);
    }

    /**
     * Close modal specified by id
     *
     * @param {string} id
     */
    close(id: string): void {
        let modal = this.find(id);

        if (! modal) {
            return;
        }

        modal.close();
    }
}
