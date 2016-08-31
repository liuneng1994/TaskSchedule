package hbi.core.dto;

import hap.core.annotation.MultiLanguage;
import hap.core.annotation.MultiLanguageField;
import hap.core.dto.BaseMultiLangDto;
import hap.core.dto.Resource;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by hailor on 16/6/2.
 */
@Entity
@Table(name = "demo_menu")
@SequenceGenerator(name="demo_menu_seq")
@MultiLanguage(tableName="demo_menu_tl",viewName = "demo_menu_vl",sequenceName = "demo_menu_tl_seq",refColumn = "menu_id")
public class DemoMenu  extends BaseMultiLangDto implements Serializable{
    @Id
    @Column
    @GeneratedValue
    private  Long id;

    @Column
    private Long parentId;

    @MultiLanguageField
    private String name;

    @MultiLanguageField
    private String description;

    @ManyToOne(optional=true)
    @JoinColumn(name="parent_id",referencedColumnName="id")
    private DemoMenu parent;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DemoMenu getParent() {
        return parent;
    }

    public void setParent(DemoMenu parent) {
        this.parent = parent;
    }
}
