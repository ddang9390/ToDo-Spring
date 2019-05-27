package com.example.ToDo.Controllers;

import com.example.ToDo.Models.Item;
import com.example.ToDo.Repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Item show(@PathVariable String id) {
        return itemRepository.findOne(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/items/{id}")
    public Item update(@PathVariable String id, @RequestBody Item item) {
        Item i = itemRepository.findOne(id);
        if(item.getName() != null) {
            i.setName(item.getName());
        }
        if(item.getDesc() != null) {
            i.setDesc(item.getDesc());
        }
        if(item.getTime() != null) {
            i.setTime(item.getTime());
        }
        itemRepository.save(i);
        return item;
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/items/{id}")
    public String delete(@PathVariable String id) {
        Item item = itemRepository.findOne(id);
        itemRepository.delete(item);

        return "";
    }
}
