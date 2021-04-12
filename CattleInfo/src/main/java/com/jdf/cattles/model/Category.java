package com.jdf.cattles.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public enum Category {
    COW(null),
    	JERSY(COW),
    	HOLSTEIN_FRIESIAN(COW),
    	GIR(COW),
    	SAHIWAL(COW),
    	RED_SINDHI(COW),
    	THARPARKAR(COW),
    	ONGOLE(COW),

    BUFFALO(null),
    	COUNTRY(BUFFALO),
    	MURRAH(BUFFALO),
    	JAFRABADI(BUFFALO),
    	BANNI(BUFFALO);

    private final Category parent;
    private final List<Category> children = new ArrayList<>();
    private final List<Category> roChildren = Collections.unmodifiableList(children);

    private Category(Category parent) {
        this.parent = parent;
        if (parent != null) {
            parent.children.add(this);
        }
    }

    public Category getParent() {
        return parent;
    }

    public List<Category> getChildren() {
        return roChildren;
    }
}