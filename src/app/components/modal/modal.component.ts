import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'modal',
    templateUrl: "./modal.component.html",
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string = null;
    @Input() title: string = 'Modal title';
    private element: Element;
    private body: HTMLElement = document.querySelector('body');

    /**
     * ModalComponent Class constructor
     *
     * @param {ModalService} modalService
     * @param {ElementRef} el
     */
    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    /**
     * Component OnInit
     */
    ngOnInit(): void {
        // Ensure id attribute exists
        if (! this.id) {
            throw new Error("modal must have an id");
        }

        // Append element to bottom of page (just before </body>) so it can be displayed above everything else
        this.body.appendChild(this.element);

        // Add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    /**
     * Remove self from modal service when directive is destroyed
     */
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    /**
     * Open the Modal
     */
    open(): void {
        this.element.classList.add("show");
        this.body.classList.add("modal-open");
    }

    /**
     * Close the Modal
     */
    close(): void {
        this.element.classList.remove("show");
        this.body.classList.remove("modal-open");
    }
}
