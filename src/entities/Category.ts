export interface Category {
    id:             number;
    category_name:  string;
    parent_id:      number;
    status:         number;
    slug:           string;
    image:          string;
    kredit_plus_id: number;
    created_at:     Date;
    updated_at:     Date;
}

export interface CategoryMap extends Category{
    child?: Array<Category>
}
