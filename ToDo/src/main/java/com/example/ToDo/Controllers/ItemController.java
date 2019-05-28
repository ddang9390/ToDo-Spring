package com.example.ToDo.Controllers;

import com.example.ToDo.Models.Item;
import com.example.ToDo.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @RequestMapping(method=RequestMethod.GET, value="/items")
    public Iterable<Item> item() {
        System.out.println("rereretr");
        return itemRepository.findAll();
    }

    @RequestMapping(method=RequestMethod.POST, value="/items")
    public Item save(@RequestBody Item item) {
        System.out.println("Thth");
        itemRepository.save(item);

        return item;
    }

    @RequestMapping(method=RequestMethod.GET, value="/items/{id}")
    public ResponseEntity<Item> show(@PathVariable String id) {
        return itemRepository.findById(id)
                    .map(item -> ResponseEntity.ok().body(item))
                    .orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method=RequestMethod.PUT, value="/items/{id}")
    public ResponseEntity<Item> update(@PathVariable String id, @RequestBody Item item) {
        return itemRepository.findById(id)
                .map(itemData -> {
                    itemData.setDesc(item.getDesc());
                    itemData.setName(item.getName());
                    itemData.setTime(item.getTime());
                    Item updatedItem = itemRepository.save(itemData);
                    return ResponseEntity.ok().body(updatedItem);
                }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/items/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        return itemRepository.findById(id)
                .map(item -> {
                    itemRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
