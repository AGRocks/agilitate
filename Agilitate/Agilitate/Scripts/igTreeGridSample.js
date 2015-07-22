﻿$(function () {
    var flatDS = [
        { "id": 0, "tasks": "Tree view", "start": "6/2/2014", "finish": "8/22/2014", "duration": "60d", "progress": "32%" },
           { "id": 1, "parentId": 0, "tasks": "Planning", "start": "6/2/2014", "finish": "6/4/2014", "duration": "3d", "progress": "100%" },
           { "id": 2, "parentId": 0, "tasks": "Write a specification", "start": "6/5/2014", "finish": "6/6/2014", "duration": "2d", "progress": "100%" },
           { "id": 3, "parentId": 0, "tasks": "Create a demo application", "start": "6/9/2014", "finish": "6/11/2014", "duration": "3d", "progress": "100%" },
           { "id": 4, "parentId": 0, "tasks": "Collect a feedback", "start": "6/12/2014", "finish": "6/12/2014", "duration": "1d", "progress": "100%" },
               { "id": 5, "parentId": 4, "tasks": "Design", "start": "6/13/2014", "finish": "6/19/2014", "duration": "5d", "progress": "60%" },
                   { "id": 8, "parentId": 5, "tasks": "Conceptual Design", "start": "6/13/2014", "finish": "6/16/2014", "duration": "2d", "progress": "100%" },
                   { "id": 9, "parentId": 5, "tasks": "Preliminary Design", "start": "6/17/2014", "finish": "6/18/2014", "duration": "2d", "progress": "65%" },
                   { "id": 10, "parentId": 5, "tasks": "Final Design", "start": "6/19/2014", "finish": "6/19/2014", "duration": "1d", "progress": "15%" },
         { "id": 6, "tasks": "Development", "start": "6/20/2014", "finish": "8/20/2014", "duration": "44d", "progress": "5%" },
              { "id": 11, "parentId": 6, "tasks": "Implementation", "start": "6/20/2014", "finish": "7/17/2014", "duration": "20d", "progress": "5%" },
              { "id": 12, "parentId": 6, "tasks": "Testing", "start": "7/18/2014", "finish": "7/31/2014", "duration": "10d", "progress": "0%" },
              { "id": 13, "parentId": 6, "tasks": "Bug fixing", "start": "8/1/2014", "finish": "8/14/2014", "duration": "10d", "progress": "0%" },
              { "id": 14, "parentId": 6, "tasks": "Documenting", "start": "8/15/2014", "finish": "8/20/2014", "duration": "4d", "progress": "0%" },
         { "id": 7, "tasks": "Project Complete", "start": "8/21/2014", "finish": "8/22/2014", "duration": "2d", "progress": "0%" },
         { "id": 15, "tasks": "Planning board", "start": "9/20/2014", "finish": "10/20/2014", "duration": "60d", "progress": "35%" },
                     { "id": 16, "parentId": 15, "tasks": "Implementation", "start": "6/20/2014", "finish": "7/17/2014", "duration": "20d", "progress": "5%" },
                     { "id": 17, "parentId": 15, "tasks": "Testing", "start": "7/18/2014", "finish": "7/31/2014", "duration": "10d", "progress": "0%" },
                     { "id": 18, "parentId": 15, "tasks": "Bug fixing", "start": "8/1/2014", "finish": "8/14/2014", "duration": "10d", "progress": "0%" },
                     { "id": 19, "parentId": 15, "tasks": "Documenting", "start": "8/15/2014", "finish": "8/20/2014", "duration": "4d", "progress": "0%" }
    ];

    $("#treegrid").igTreeGrid({
        width: "100%",
        height: "500px",
        dataSource: flatDS,
        autoGenerateColumns: false,
        autoCommit: true,
        primaryKey: "id",
        foreignKey: "parentId",
        columns: [
            { headerText: "ID", key: "id", width: "120px", dataType: "number" },
            { headerText: "Tasks", key: "tasks", width: "250px", dataType: "string" },
            { headerText: "Start", key: "start", width: "130px", dataType: "string" },
            { headerText: "Finish", key: "finish", width: "130px", dataType: "string" },
            { headerText: "Duration", key: "duration", width: "100px", dataType: "string" },
            { headerText: "Progress", key: "progress", width: "130px", dataType: "string" }
        ],
        initialExpandDepth: 1,
        renderExpansionIndicatorColumn: true,
        features: [
            {
                name: "Selection",
                mode: "row",
                multipleSelection: true,
                activation: true
            },
        {
            name: "Sorting"
        },
        {
            name: "Filtering"
        },
        {
            name: "Paging",
            pageSize: 5
        },
        {
            name: "Updating",
            editMode: "row",
            enableDeleteRow: true,
            enableAddRow: true,
            columnSettings: [
                {
                    columnKey: "ID",
                    editorOptions:
                        {
                            type: "numeric",
                            disabled: true
                        }
                }
            ]
        }]
    });

    $("#btnAddNode").click(function () {
        $("#divdeps").dialog('open');
    });

    $('#divdeps').dialog({
        autoOpen: false,
        show: 'slide',
        resizable: false,
        position: 'center',
        stack: true,
        height: 'auto',
        width: 'auto',
        modal: true,
        buttons:
        {
            "Cancel": function () {
                $(this).dialog("close");
            },
            "Add": function () {
                var task = $("#task").val();
                var parent = $("#parent").val();

                var ds = $('#treegrid').data("igTreeGrid").dataSource;
                var newRow = { "id": 100, "tasks": task, "duration": "0d", "parentId": parent };
                //$("#treegrid").igTreeGridUpdating("addRow", newRow);
                alert(JSON.stringify(newRow));
                ds.insertRow(newRow.id, newRow, 5, true, newRow.parentId);
                //$("#treegrid").igGrid("saveChanges");
                $('#treegrid').data("igTreeGrid").dataBind();

                $(this).dialog("close");
            }
        }
    });
});