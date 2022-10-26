import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Model } from '../../../app/interfaces/model';
import { ModelDetails } from '../../../app/interfaces/modelDetails';
import { Payment } from '../../../app/interfaces/payment';
import { ModelFilter } from '../../../app/interfaces/modelFilter';
import ModelsJson from '../../../assets/models.json';
import PaymentOptionsJson from '../../../assets/paymentOptions.json';
import ModelFilterJson from '../../../assets/modelFilter.json';

@Component({
  selector: 'app-modles',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})

export class ModelsComponent implements OnInit {

  models: Model[] = ModelsJson;
  paymentOptions: Payment[] = PaymentOptionsJson.paymentOptions;
  filterValues: ModelFilter[] = ModelFilterJson.modelFilter;

  budgetAmount: number = 25;
  budgetAmountInput: number = 25000
  modelIsSelected: boolean = false;
  selectedModel?: Model;
  modelTypesToShow?: ModelDetails[];
  selectedModelTypes?: ModelDetails[];

  // Payment options selection and slider
  updateBudgetAmount(event: any) {
    let percentage = Number(this.budgetAmountInput) / 100 * 0.1;
    this.budgetAmount = percentage;
  }

  updateBudgetInput(event: MatSliderChange) {
    this.budgetAmountInput = event.value! * 1000;
  }

  // On click of model thats types should show
  setSelectedModel(id: number) {
    if (id == 0) {
      this.setAllModelsFilter();
      return;
    }
    this.modelIsSelected = true;
    this.selectedModel = this.models.find(model => model.id == id);
    if (this.selectedModel != null) {
      this.setSelectedModelFilter(this.selectedModel);
      this.modelTypesToShow = this.selectedModel.types;
    }
  }

  setModelTypeSelected(id: number) {
    let selectedType = this.modelTypesToShow?.find(type => type.id == id);
    if (selectedType) {
      selectedType.isSelected = !selectedType.isSelected;
    }
  }

  // Setting the filter to the correct model
  setSelectedModelFilter(selectedModel: Model) {
    let selectedFilter = this.filterValues.find(filter => filter.modelId == selectedModel?.id);
    this.setFilterToUnselected();
    if (selectedFilter) {
      selectedFilter.isSelected = true;
    }
  }

  // 'All' filter handled separately
  setAllModelsFilter() {
    let selectedFilter: ModelFilter;
    selectedFilter = this.filterValues[0];
    this.setFilterToUnselected();
    selectedFilter.isSelected = true;
    this.modelIsSelected = false;
    this.modelTypesToShow = [];
  }

  // Convenience function for filter
  setFilterToUnselected() {
    if (this.filterValues) {
      this.filterValues.forEach((filter) => filter.isSelected = false);
    }
  }

  // Find my BMW button to print out selected models
  findMyBMW() {
    this.models.forEach((model) => model.types?.forEach((type: ModelDetails) => {
      if (type.isSelected == true) {
        console.log('Selected Model Type', type);
      }
    }));
  }

  constructor() { }

  ngOnInit(): void { }

}
