export class ExpenseCategoryModel {

    id: number;
    parentId: number;
    defaultName: string;

    name: string;
    description: string;

    children: ExpenseCategoryModel[];
}
