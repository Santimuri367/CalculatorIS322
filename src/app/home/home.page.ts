// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton 
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  ]
})
export class HomePage {
  currentOperand: string = '';
  previousOperand: string = '';
  operation: string | null = null;
  shouldResetScreen: boolean = false;

  constructor() {}

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
  }

  appendNumber(number: string) {
    
    if (this.shouldResetScreen) {
      this.currentOperand = number;
      this.shouldResetScreen = false;
    } else {
      // Handle special case of 0
      if (this.currentOperand === '0' ) {
        this.currentOperand = number;
      } else {
        this.currentOperand += number;
      }
    }
  }

  changeSign() {
    if (this.currentOperand) {
      this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    }
  }


  chooseOperation(operation: string) {
    if (this.currentOperand === '') return;
    
    if (this.previousOperand !== '') {
      this.calculate();
    }
    
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  calculate() {
    if (this.currentOperand === '' || this.previousOperand === '' || !this.operation) {
      return;
    }

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    let result = 0;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.currentOperand = 'Error';
          this.previousOperand = '';
          this.operation = null;
          this.shouldResetScreen = true;
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = this.formatNumber(result);
    this.operation = null;
    this.previousOperand = '';
    this.shouldResetScreen = true;
  }

  private formatNumber(num: number): string {
    const stringNum = num.toString();
    if (Number.isInteger(num)) {
      return stringNum;
    }
    
    const decimalPlaces = 10;
    return num.toFixed(decimalPlaces).replace(/\.?0+$/, '');
  }
}