package com.example.ToDo.Repositories;

import com.example.ToDo.Models.Item;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, String> {

    @Override
    void delete(Item deleted);
}
